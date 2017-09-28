--- 
layout: post
title: Processing custom events in kernel.terminate
tags: ['symfony', 'php', 'events']
excerpt: When you have some long running processes to trigger on request, best practice with Symfony is to have them run in the kernel.terminate event.
image: /uploads/2017/08/symfony-kernel.terminate.png
hn_id: 15100410
---

### What is the kernel.terminate event?

It is the last event that is triggered in Symfony, just after the response has been sent to the client (only on php-fpm). This means that we can do some heavy lifting here because our response time is not affected. The client gets the response quickly and our processing will occur afterwards. 

The Symfony SwiftMailer bundle does this by default, so we should be ok with emails, but my latest project needs to connect to various APIs on some events, and this takes quite some time. 

In this post I will explain the method I use to make them run in the `kernel.terminate` event.

For a primer about Symfony events, I recommend the [official Symfony documentation](https://symfony.com/doc/current/reference/events.html)

### Custom events

Custom events are trigerred from our own code, generally in the controller, and it goes something like this:

{% highlight php startinline=1 %}
/** 
* @var $dispatcher \Symfony\Component\EventDispatcher\EventDispatcherInterface 
*/
//Get the event dispatcher from the container
$dispatcher = $this->get('event_dispatcher');
//Create our custom event
$event = new NewUserEvent($user, $request);
//Dispatch the event
$dispatcher->dispatch(AppEvents::NEW_USER, $event);
{% endhighlight %}

### The event subscriber

Then we have an EventSubscriber that will listen to our custom events, in my case it's called `ApiSubscriber` and is located in `src/EventSubscriber`. In this case it listens to two different events: 
`AppEvents::NEW_USER` and `AppEvents::DELETE_USER`.

{% highlight php startinline=1 %}
class ApiSubscriber implements EventSubscriberInterface {

    protected $container;

    public function __construct(\Symfony\Component\DependencyInjection\ContainerInterface $container) {
        $this->container = $container;
    }

    public static function getSubscribedEvents()
    {
        return array(
            AppEvents::NEW_USER => 'newUser',
            AppEvents::DELETE_USER => 'deleteUser',
        );
    }

    //...
}

{% endhighlight %}

### Configure the service

You will notice that I inject the container as it makes it easy to get everything we need, such as parameters or other services.

Don't forget to configure the event subscriber in `app/config/services.yml` like so:

{% highlight yaml %}
services:
    api.subscriber:
        class: AppBundle\EventSubscriber\ApiSubscriber
        arguments: ["@service_container"]
        tags:
            - { name: kernel.event_subscriber }
{% endhighlight %}

Now our event subscriber is ready for action whenever we trigger the event from our controllers.

### Handle your custom event


The event handling function is where the magic happens. Say when a new user is created, the `AppEvents::NEW_USER` is triggered and the `ApiSubscriber::newUser` function is called.

Here it is, I'll explain later

{% highlight php startinline=1 %}
public function newUser(NewUserEvent $newUserEvent)
{
    // Get the request from our custom event
    $request = $newUserEvent->getRequest();
    // Add custom attributes to the request, so we can retrieve them later in the kernel.terminate event
    $request->attributes->add([
        'user' => $newUserEvent->getUser(),
        'thing_api_key' => $this->container->getParameter('thing_api_key'),
        'thing_api_user' => $this->container->getParameter('thing_api_user'),
    ]);
    // Add our custom listener to the kernel.terminate event
    // We will see later what the createThingOnApi static function looks like
    $this->container->get('event_dispatcher')->addListener('kernel.terminate', [self::class, 'createThingOnApi']);

    // This would also work but is not as clean in my opinion
    // $this->container->get('event_dispatcher')->addListener('kernel.terminate', function(PostResponseEvent $event) {
        // Do things on the API
    // });
}
{% endhighlight %}

So, from this code it is clear what happens. We first get the request from our custom event, then we set custom attributes on the request (simply because we need to retrieve them later from our static function) and finally we add a new listener (our static function, could also be an anonymous function) to the kernel.terminate event.

### Do the job

The final piece of the puzzle is our `createThingOnApi` static function that will do the real work.

Here it is:

{% highlight php startinline=1 %}
public static function createThingOnApi(PostResponseEvent $event)
{
    $attrs = $event->getRequest()->attributes;
    $user = $attrs->get('user');

    $data = [
        "type" => "newUser", 
        "name" => $user->getName(),
        //...
    ];

    $ch = curl_init("https://api.thing.com/users");
    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        'Content-Type: application/json',
        'Content-Length: ' . strlen($data_string),
        'X-Auth-Key: ' . $attrs->get('thing_api_key'),
        'X-Auth-User: ' . $attrs->get('thing_api_user')
    ]);

    curl_exec($ch);
}
{% endhighlight %}

This basically retrives our data from the request attributes, and then make some sort of curl request to an external API.

### All done !

Do this and watch your response times go way down ([only on php-pfm](https://symfony.com/doc/current/components/http_kernel.html#component-http-kernel-kernel-terminate))

I'm not saying the is the best or even the only method to achieve this, just the one I personally use. the alternative would be some sort of mesasge queue, but it still seems like premature optimisation for an app of this size. If you have other options to achieve this, let me know in the comments on HN.

### Profiler results

{:.image}
![Profiler results](/uploads/2017/08/symfony-kernel.terminate.png)