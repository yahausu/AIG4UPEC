import { SearchForm } from "@/components/SearchForm";

import { client } from "@/sanity/lib/client";
import { STARTUPS_QUERY } from "@/sanity/lib/queries";
import StartupCard ,{ StartUpTypeCard  } from "@/components/StartupCard";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";

export default async function Home( { searchParams } : { searchParams : Promise<{query?: String}>}) {

  const query = (await searchParams).query;
  const params = { search : query || null}
  const {data : posts} = await sanityFetch({query:STARTUPS_QUERY, params})
 
  return (
    <>
    <section  className="pink_container"> 
      <h1 className="heading">Pitch Your Startup, <br /> 
          connect with entrepreneurs 
      </h1>
      <p className="sub-heading !maw-w-3xl">
      Submit Ideas, Vote on Pitches, and Get Noticed in Virtual Conpititions
      </p>
      <SearchForm query= {query} />
    </section>
    <section className="section_container">
     <p className="text-30-semibold">{query ? `Search for "${query}"` : "All Startups"}</p> 
     <ul className="card_grid">
     {posts?.length > 0 ? (
            posts.map((post: StartUpTypeCard) => (
              <StartupCard key={post?._id} post={post} />
            ))
          ): (<p className="no-results"> No Startup found </p>)
    }

     </ul>
    </section>

    <SanityLive/>
    
    
    </>
  );
}
