class ApiFeatures {
    // query is the mongoDB query to be executed. ex:- model.find({});
    // queryStr contains all the keywords in the req query;
    constructor(query, queryStr){
        this.query = query;
        this.queryStr = queryStr;
    }

    search(){
        const keyword = (this.queryStr.keyword)?{
            name: {
                $regex: this.queryStr.keyword,
                $options: 'i'
            }
        }:{};

        this.query = this.query.find({...keyword});
        return this;
    }

    filter(){
        let newQueryStr = {...this.queryStr};
        const removeProps = ["keyword", "page", "limit"];
        removeProps.forEach(key => delete newQueryStr[key]);
        this.query = this.query.find(newQueryStr);
        return this;
    }
}

module.exports = ApiFeatures;