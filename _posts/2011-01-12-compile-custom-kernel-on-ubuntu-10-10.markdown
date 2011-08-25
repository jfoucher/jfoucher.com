--- 
layout: post
title: <!--:en-->Compile custom kernel on Ubuntu 10.10<!--:-->
excerpt: My experience compiling a custom kernel from source, using Ubuntu 10.10 Maverick Meerkat, on a Sony Vaio F111 series
tags: []

date: Wed Jan 12 15:06:02 +0100 2011
---
First off, you want to grab the latest kernel source from <a href="http://kernel.org/">http://kernel.org/</a> and save it to a folder on your computer. I used my browser's default : <code inline="true" lang="bash">~/Downloads</code>. Right click on the archive and select "extract here"
<h3>Configuration</h3>
Open a terminal, "cd" to your source directory, in my case <code inline="true" lang="bash">cd ~/Downloads/linux-2.6.37</code> and run <code inline="true" lang="bash">make gconfig</code> if using Ubuntu or <code inline="true" lang="bash">make kconfig</code> if running Kubuntu. At that point, you'll need to know a fair bit about your system's hardware, to select only the options that are applicable. I like to reuse my current config as a starting point, so if you are using the default ubuntu kernel, the configuration used is stored in the <code inline="true">/boot</code> directory, with names like <code inline="true">config-2.6.35-24-generic</code> Copy the latest one to your linux source directory. When the configuration editor is loaded, choose <code inline="true">File >> Load</code> and select the file you just copied over. Now the Ubuntu default configuration is loaded. If you were to compile your kernel you would get the same kind of system you have now : functional but suboptimal.

We'll try and better that a bit.

The first submenu I open is Processor type and features. In there, I disable everything related to SMP and Paravirtualized guest support as I do not plan to run this as a VM guest. I choose the type of processor appropriate to my machine, in this case "new Xeon"

You can use <code inline="true" lang="bash">make localmodconfig</code> which will disable all the modules not currently loaded from your config file. Be careful though, because if there are devices and/of file systems you're not using at the moment, the drivers won't be added.
<h3>Compiling and instalation</h3>
Once you're happy with the configuration, save and close the editor, and run <code inline="true" lang="bash">make all</code> or <code inline="true" lang="bash">make -j4 all</code> on multicore processors to run several processes in parallel, which will compile the kernel and the modules specified in the .config file

That's the regular debian method, in which you have to run mkinitrd afterwards. I ended up doing it <a href="https://help.ubuntu.com/community/Kernel/Compile">the ubuntu way</a>, where you create .deb packages you can later install with your preferred package manager.
<blockquote>
<p class="line862">If you re-used the existing configuration, note that Ubuntu kernels build with debugging information on, which makes the resulting kernel modules (*.ko files) much larger than they would otherwise be. To turn this off, go into the config's "Kernel hacking"&lt;!-- ; then, under "Kernel debugging", --&gt; and turn OFF "Compile the kernel with debug info".</p>
<p class="line874">Now you can compile the kernel and create the packages:</p>
<code lang="bash">make-kpkg clean # only needed if you want to do a "clean" build
fakeroot make-kpkg --initrd --append-to-version=-some-string-here kernel-image kernel-headers</code></blockquote>
<p style="text-align: center;"><img class="aligncenter" src="http://media.tumblr.com/tumblr_let0e9SCP01qzbvjd.png" alt="" width="500" height="338" /></p>
Much easier...
<h3>Drivers</h3>
Of course, if you're using non-free drivers, you'll want to reinstall them. The first time I booted the new kernel, X did not start because it couldn't load the nvidia kernel module. Luckily, I had the latest driver around from a previous install, so installed straight away from the command line.

You should now have a working Ubuntu install running your own custom kernel. Of course, you are responsible for upgradin kernel and binary drivers, as the updates from Ubuntu are not going to work any longer... Although I'm not so sure about that. I'll see in a while I guess.
<h3>Done!</h3>
Anyway, in my case this upgrade is really worth it because I get a functioning built-in microphone on my Vaio! Yay!

So the moral is: don't be scared of trying a custom kernel, it really got much easier, and if you don't like it, going back is as easy as selecting another entry in grub...
