import {createClient} from "redis";

export const connectDB=async()=>{
  const client = createClient({
    username: 'AHMET',
    password: '515Ff?217589',
    socket: {
        host: 'redis-15622.c239.us-east-1-2.ec2.cloud.redislabs.com',
        port: 15622
    }
});

client.on('error', err => console.log('Redis Client Error', err));
await client.connect();
return client;
}

