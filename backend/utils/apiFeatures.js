class ApiFeatures {
    // query is the mongoDB query to be executed. ex:- model.find({});
    // queryStr contains all the keywords in the req query;
    constructor(query, queryStr){
        this.query = query;
        this.queryStr = queryStr;
    }

    search(){
        const keyword = (this.queryStr.name)?{
            name: {
                $regex: this.queryStr.name,
                $options: 'i'
            }
        }:{};

        this.query = this.query.find({...keyword});
        return this;
    }
}

module.exports = ApiFeatures;