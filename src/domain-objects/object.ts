import { QueryTimestampsConfig } from "mongoose"

type User={
    uid:string,
    loginInfo:{
        email:string,
        password:string,
        verified:boolean,
        otp:string,  //one-time password
    },
    name:string,
    gender:string,
    country:string,
    state:string,
    suburb:string,
    postcode:string,
    study_field:string,
    articles:string[], //all articles' ids uploaded by this user
    subscription:boolean,
}

type Article={
    id:string,
    uid:string,  //user id useful?
    content:string,
    topic:string,
    feedback:string,
    mark:number,
    date:Date,
}

type Subscribe={
    id:string,
    uid:string,
    planID:string,
    subscription_start_timestamp:EpochTimeStamp,  //didn't find proper datatype for timestamp
    subscription_end_timestamp:EpochTimeStamp,
}

type Plan={
    id:string,
    plan_type:string,
    price:string,
}