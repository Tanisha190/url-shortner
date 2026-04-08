const redisClient = require('../redis/redisConnection');
const { generateBase62Id } = require('../utils.js/idgenerator');
const Url = require('../schema/url');
const createShortUrl=async(req,res)=>{
    try {
        const {longUrl,alias}=req.body;
        if(!longUrl){
            return res.status(400).json({message:'Long URL required'});
        }
        const shortUrl = generateBase62Id(6, alias);
         await Url.create({
            shortUrl: shortUrl,
            longUrl: longUrl,
            alias: alias,
            createdBy: req.user.id,
        });
        redisClient.set(shortUrl, longUrl,'EX',3600);
        redisClient.set(longUrl, shortUrl,'EX',3600);
        return res.status(201).json({message:'Short URL created successfully',data:{shortUrl:shortUrl}});
    } catch (error) {
        return res.status(500).json({error:error.message});
    }
}
const fetchShortURL=async(req,res)=>{
    try {
        const {alias}=req.params;
        const cache = await redisClient.get(alias);
        if(cache){
            return res.redirect(cache.longUrl);
        }
        const dbData= await Url.findOne({shortUrl:alias});
        if(!dbData){
            return res.status(404).json({message:"Url not found in the database",data:{}});
        }
        return res.redirect( dbData.longUrl);
    } catch (error) {
        return res.status(500).json({error:error.message});
}
}

module.exports={createShortUrl,fetchShortURL};