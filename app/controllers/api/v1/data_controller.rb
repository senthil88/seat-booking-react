class Api::V1::DataController < ApplicationController
  
  def set1    
    data = { 
      "venue":{"layout":{"rows":10,"columns":50}},
      "seats":{
        "a1":{"id":"a1","row":"a","column":1,"status":"AVAILABLE"},
        "b5":{"id":"b5","row":"b","column":5,"status":"AVAILABLE"},
        "h7":{"id":"h7","row":"h","column":7,"status":"AVAILABLE"},
        "a25":{"id":"a25","row":"a","column":25,"status":"AVAILABLE"},
      }
    }
    render json: data
  end

end