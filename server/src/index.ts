import express, { Application } from "express";
import { ApolloServer } from "apollo-server-express";
import { typeDefs, resolvers } from './graphql';
import { connectDatabase } from "./database";
const port = 9000;

const mount = async (app: Application) => {
    const db = await connectDatabase();
    const server = new ApolloServer({ 
        typeDefs, 
        resolvers,
        context: () => ({ db })
     });
    server.applyMiddleware({ app, path: "/orchard"});
    app.listen(port);

    const listings = await db.listings.find({}).toArray();
    console.log(listings, 'THE Listings');
    console.log(`[app] : http://localhost:${port}`);
};

mount(express());

/* 
    // Experimental API services
    app.get('/', (_req, res) => res.send(`1 + 2 = ${one + two}`));
    app.use(bodyParser.json());
    app.post("/delete-listing", (req, res) => {
        const id: string = req.body.id;
      
        for (let i = 0; i < listings.length; i++) {
          if (listings[i].id === id) {
            return res.send(listings.splice(i, 1)[0]);
          }
        }
      
        return res.send("failed to deleted listing");
      });
    app.get("/listings", (_req, res) => {
       res.send(listings);
    });
    // End Experimental API services
    */