require 'sinatra'
require 'csv'

def parseCSV(path)
    CSV.parse(path)
end

get '/content' do
    data = []
    files = Dir["../data/*.csv"]
    files.each do |file_name|
        if !File.directory? file_name
            fromCSV = CSV.read("../data/#{file_name}")
            data << fromCSV
        end
    end

    data.to_json
end

