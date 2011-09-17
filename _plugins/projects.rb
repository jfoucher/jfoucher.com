require 'fileutils'
require 'find'
require 'curb'
require 'json'
module Jekyll



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
        #path     = '/'+page.subfolder + '/' + page.name
        #mod_date = File.mtime(site.source + path)
       
        if page.data['page_type'] = 'project'
              projects << page
        end
      }

      self.data['projects'] = projects
      self.data['title'] = "Projects"
    end
  end

  class ProjectsIndexGenerator < Generator
    safe true
    priority :low

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