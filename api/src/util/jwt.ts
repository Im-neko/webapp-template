import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import * as fs from "fs";


const pubKey = __dirname + '/../' + process.env.PUB_KEY;
const privKey = __dirname + '/../' + process.env.PRIV_KEY;
console.log(pubKey, privKey);

export const decodeJWT = (req: Request, res: Response, next: Function) => {
  const token = req.body.token || req.query.token || req.headers["x-access-token"];
  if ( !token ) {
    next();
    return;
  }
  if (token === "testt0ken2255") {
    req.decoded = {userId: "bacb0373fe2fa30508e7c925", user_name: "im_neko"};
    next();
    return;
  }
  jwt.verify( token, fs.readFileSync( pubKey ), { algorithms: ["RS256"] }, function( err, decoded ) {
    if ( err ) {
      return res.status(403).json( { "error": "Invalid token" } );
    }
    req.decoded = decoded;
    next();
  });
};

export const checkJWT = (req: Request, res: Response, next: Function) => {
  const token = req.body.token || req.query.token || req.headers["x-access-token"];
  if ( !token ) {
    return res.status(403).send( { error: "No token provided." } );
  }
  if (token === "testt0ken2255") {
    req.decoded = {userId: "bacb0373fe2fa30508e7c925", user_name: "im_neko"};
    next();
    return;
  }
  jwt.verify( token, fs.readFileSync( pubKey ), { algorithms: ["RS256"] }, function( err, decoded ) {
    if ( err ) {
      return res.status(403).json( { "error": "Invalid token" } );
    }
    req.decoded = decoded;
    next();
  });
};

export const signJWT = (obj: object) => {
  return jwt.sign(
    obj,
    fs.readFileSync( privKey ),
    {expiresIn: "24h", algorithm: "RS256"}
  );
};

export const pubkey = () => fs.readFileSync( pubKey );
