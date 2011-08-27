# Adopted from Scott Kyle's Rakefile
# http://github.com/appden/appden.github.com/blob/master/Rakefile

task :default => :copy


desc 'Build site with Jekyll'
task :build do
  jekyll
end

desc 'Copy htaccess'
task :copy => :build do
  sh 'cp .htaccess _site/.htaccess'
end


desc 'Build and deploy'
task :deploy => :copy do
  sh 'rsync -rtzh --progress --delete _site/ tatey@tatey.com:~/var/www/tatey.com/'
end

def jekyll(opts = '')
  sh 'rm -rf _site'
  sh 'jekyll ' + opts
end