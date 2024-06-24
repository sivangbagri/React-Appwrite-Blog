const conf={

    appWriteUrl:String(process.env.REACT_APP_APPWRITE_URL),
    appWriteProjectID:String(process.env.REACT_APP_APPWRITE_PROJECT_ID),
    appWriteDatabaseID:String(process.env.REACT_APP_APPWRITE_DATABASE_ID),
    appWriteBlogsCollectionID:String(process.env.REACT_APP_APPWRITE_BLOGS_COLLECTION_ID),
    appWriteUsersCollectionID:String(process.env.REACT_APP_APPWRITE_USERS_COLLECTION_ID),
    appWriteBucketID:String(process.env.REACT_APP_APPWRITE_BUCKET_ID),
}

export default conf

