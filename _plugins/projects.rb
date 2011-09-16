require 'fileutils'
require 'find'
require 'curb'
require 'json'
module Jekyll


  class Project < Page
    def initialize(site, base, dir,name)
      @site = site
      @base = base
      @dir = dir
      @name = name

      self.process(@name)
      self.read_yaml(dir, name)
      if self.data['type'] == "open_source"
          c = Curl::Easy.perform("http://github.com/api/v2/json/repos/show/jfoucher/" + self.data['gitname'])
          #print c.body_str
          self.data['gitdata'] = JSON.parse(c.body_str)
          #print self.data['gitdata']
      end


    end
  end

  class ProjectsIndex < Page
    def initialize(site, base, dir)
      @site = site
      @base = base
      @dir = dir
      @name = 'index.html'

      self.process(@name)
      self.read_yaml(File.join(base, '_layouts'), 'projects.html')

      projects=Array.new;
      site.pages.each{ |page|
        path     = page.subfolder + '/' + page.name
        mod_date = File.mtime(site.source + path)

        if page.subfolder=~/projects/
            unless page.name=~/index/
              project = Project.new(site, site.source, dir,page.name)

              projects << project
            end
        end
      }

      self.data['projects'] = projects
      self.data['title'] = "Projects"
    end
  end

  class ProjectsIndexGenerator < Generator
    safe true

    def generate(site)
      if site.layouts.key? 'projects'
        dir = site.config['projects_dir'] || 'projects'
        #print dir
        write_projects_index(site, dir)

      end
    end

    def write_projects_index(site, dir)
      index = ProjectsIndex.new(site, site.source, dir)
      index.render(site.layouts, site.site_payload)
      index.write(site.dest)
      site.pages << index
    end
  end

end