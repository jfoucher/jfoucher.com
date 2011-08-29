desc 'Build and deploy'
task :deploy do
  jekyll '/var/www/jfoucher.github.com /var/www/jfoucher.github.com/_site'
  sh 'cp -r /var/www/jfoucher.github.com/_site/* ./'
  sh 'cp -r /var/www/jfoucher.github.com/.htaccess ./'
  sh 'git add .'
  sh 'git commit -am"Building and pushing with rake"'
  sh 'git push'
end

def jekyll(opts = '')
#  sh 'rm -rf _site'
  sh 'jekyll ' + opts
end
