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
      print File.join(base, '_projects')
      self.read_yaml(File.join(base, '_projects'), name)
      if self.data['type'] == "open_source"
          url = "https://api.github.com/repos/jfoucher/" + self.data['gitname']
          #print url + "\r\n"
          c = Curl::Easy.perform(url)
          print"\r\n\r\n"
          print"\r\n\r\n"
          print c.body_str
          print"\r\n\r\n"
          print"\r\n\r\n"
          self.data['gitdata'] = JSON.parse(c.body_str)
          #print self.data['gitdata']
      end
      self.data['page_type'] = "project"


    end
  end

  class ProjectGenerator < Generator
    safe true
    priority :high
    

    def generate(site)
        dir = site.config['project_dest_dir'] || 'projects'
      base_dir = site.config['project_dir'] || '_projects'
      projects= []
      Find.find(base_dir) do |file|
        if file=~/.markdown$/
          projects << file
        end
      end
      projects.each do |project_path|
        project_name = project_path.sub(/^_projects\/([^\.]+)\..*/, '\1')
        
        project = Project.new(site, site.source, dir, project_name + ".markdown")
        project.render(site.layouts, site.site_payload)
        project.write(site.dest)

        #print project
        site.pages << project

        #site.static_files << Jekyll::StaticProjectFile.new(site, site.dest, base_dir, project_name + '.html')
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