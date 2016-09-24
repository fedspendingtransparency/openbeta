require 'colored'
require 'open3'
require 'html-proofer'
require 'rake/testtask'

def exec_and_manually_watch_for_errors(cmd)
  stderr_output = []
  # we want to monitor stderr without blocking it from printing live
  # so we setup a pipe and fork a seperate process to run the command
  rd, wr = IO.pipe
  fork do
    system(cmd, out: :out, err: wr)
  end
  wr.close   # close the write end of the pipe, since we don't need it.
  rd.each_line { |line|
    $stderr.puts line;
    stderr_output << line.chomp
  }
  if stderr_output.any?
    # jekyll doesn't exit 1 if something fails to build, so instead we
    # check if anything printed to stderr, and if so, exit 1 ourselves
    exit 1
  end
end

# desc "install prerequisites"
# task :install do
#   puts "Installing prerequisites...".green
#   sh 'bundle install --path vendor/bundle'
# end

desc "run htmlproofer"
task :htmlproofer do
  puts "Checking for dead links, valid images, etc."
  # htmlproofer doesn't understand the baseurl config
  # so we move everything into the folder it expects to see
  sh 'mv _site dev'
  sh 'mkdir _site'
  sh 'mv dev _site/'
  begin
    HTMLProofer.check_directory("./_site").run
  ensure
    # and then move it all back
    # I hate it too...
    sh 'mv _site/dev/* _site/'
    sh 'rm -rf _site/dev'
  end
end

desc "perform a jekyll site build"
task :jekyll do
  puts "Performing a full build...".green
  cmd = 'bundle exec jekyll build'
  exec_and_manually_watch_for_errors(cmd)
end

desc "run the local server"
task :serve do
  puts "Building and starting the local server..."
  sh 'bundle exec jekyll serve'
end

desc "watch for changes and automatically rebuild (incrementally)"
task :incremental do
  puts "Performing an incremental build..."
  sh 'bundle exec jekyll build --incremental --safe --watch'
end

desc "perform a full build and test"
task :build => [:jekyll, :htmlproofer] do
  puts "Performing full build and tests".green
end

Rake::TestTask.new do |t|
  t.libs << "test"
  t.test_files = FileList['_test/*.rb']
  t.verbose = true
end
