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

require 'colorize'
require 'open3'

# desc "install prerequisites"
# task :install do
#   puts "Installing prerequisites...".green
#   sh 'bundle install --path vendor/bundle'
# end

desc "perform a full jekyll site build"
task :jekyll do
  puts "Performing a full build...".green
  cmd = 'bundle exec jekyll build'
  exec_and_manually_watch_for_errors(cmd)
end

desc "watch for changes and automatically rebuild (incrementally)"
task :serve do
  puts "Performing an incremental build...".green
  sh 'bundle exec jekyll build --incremental --safe --watch'
end
