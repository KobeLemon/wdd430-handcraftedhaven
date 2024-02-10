import ArtisansCard from "./artisansCard";
import { Artisan } from "@/app/lib/definitions";


export default function ArtisansList({ artisans } : { artisans: Artisan[]}) {

  return (

    <div className="w-full flex flex-wrap gap-6 items-center justify-center">
  
      {

        artisans.map( (artisan : Artisan) => (

          <ArtisansCard

            key={artisan.id}
            
            id={artisan.id} 
            
            name={artisan.name}

            pictures={artisan.pictures}

            description=""
            
            collection=""
            
          />

        ) )
        
      }

    </div>

  )

}