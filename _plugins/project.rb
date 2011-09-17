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
      self.data['test'] = "test"


    end
  end

  class ProjectGenerator < Generator
    safe true
    priority :highest
    

    def generate(site)
      if site.layouts.key? 'projects'
        dir = site.config['projects_dir'] || 'projects'
        #print dir


      base_dir = site.config['project_dir'] || 'projects'
      projects= []
      Find.find("projects") do |file|
        if file=~/.markdown$/
          projects << file
        end
      end
      projects.each do |project_path|
        project_name = project_path.sub(/^projects\/([^\.]+)\..*/, '\1')
        
        project = Project.new(site, site.source, base_dir, project_name + ".markdown")
        project.render(site.layouts, site.site_payload)
        project.write(site.dest)

        #print project
        site.pages << project

        #site.static_files << Jekyll::StaticProjectFile.new(site, site.dest, base_dir, project_name + '.html')
      end

      end
    end

    def write_project(site, dir)
      index = ProjectsIndex.new(site, site.source, dir)
      index.render(site.layouts, site.site_payload)
      index.write(site.dest)
      site.pages << index
    end
  end

end