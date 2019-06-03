require 'sinatra'
require 'csv'

def seed_data()
    data = []
    files = Dir["../data/*.csv"]
    files.each do |file_name|
        if !File.directory? file_name
            fromCSV = CSV.read("../data/#{file_name}")
            data << fromCSV
        end
    end

    data
end

DATA = seed_data[0]
SCORES = []

DATA.size.times do |num|
    SCORES[num] = 0
end

def parsed_body(request) 
    JSON.parse request.body.read
end




get '/content' do
    { :content => DATA, :votes => SCORES }.to_json
end

post '/content/:idx/rate' do
    data = parsed_body request
    vote = data['vote'].to_i
    idx = params['idx'].to_i

    if vote == -1 || vote == 1
        SCORES[idx] += vote
    end

    SCORES[idx].to_s
end


