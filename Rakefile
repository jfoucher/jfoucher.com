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

  sh 'cp CNAME _site/CNAME'
end


desc 'Build and deploy'
task :deploy do
  sh 'cd /var/www/jfoucher.github.com/; cp _assets/*.less assets/css/'
  sh 'cd assets/css/;lessc screen.less > screen.css; rm *.less;cd ../..'
  sh "sed -i'.bkp' -e's/stylesheet.less/stylesheet/' _includes/head.html"
  sh "sed -i'.bkp' -e's/screen.less/screen.css/' _includes/head.html"

  jekyll
  sh 'cp -r _site/* /var/www/jfoucher.github/'
  #sh 'cd _static/'
  sh 'cd /var/www/jfoucher.github; git add .; git commit -am"Building and pushing with rake"; git push'
  #sh 'git commit -am"Building and pushing with rake"'
  #sh 'git push'
  sh 'cd /var/www/jfoucher.github.com/; cp _assets/*.less assets/css/'
end

desc 'Local deploy'
task :local do
  sh 'cd /var/www/jfoucher.github.com/; cp _assets/*.less assets/css/'
  sh 'cd assets/css/;lessc screen.less > screen.css; rm *.less;cd ../..'
  #sh "sed -i'.bkp' -e's/stylesheet.less/stylesheet/' _includes/head.html"
  #sh "sed -i'.bkp' -e's/screen.less/screen.css/' _includes/head.html"
  jekyll
  sh 'rm -rf /var/www/jfoucher.github/*'
  sh 'cp -r _site/* /var/www/jfoucher.github/'
end

def jekyll(opts = '')
  sh 'rm -rf _site'
  sh 'jekyll ' + opts
end
