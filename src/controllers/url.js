const redisClient = require('../redis/redisConnection');
const { generateBase62Id } = require('../utils.js/idgenerator');

const createShortUrl=async(req,res)=>{
    try {
        const {longUrl,alias}=req.body;
        if(!longUrl){
            return res.status(400).json({message:'Long URL required'});
        }
        const shortUrl = generateBase62Id(6, alias);
        const  Url = new Url({
            shortUrl: id,
            longUrl: longUrl,
            alias: alias,
            createdBy: req.user.id,
        });
        await newUrl.save();
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
        if(!cache){
            return res.redirect(302, cache.longUrl);
        }
        const dbData= Url.findOne({shortUrl:alias});
        if(!dbData){
            return res.status(4).json({message:"Url not found in the database",data:{}});
        }
        return res.redirect(302, dbData.longUrl);
    } catch (error) {
        return res.status(500).json({error:error.message});
}
}

module.exports={createShortUrl,fetchShortURL};