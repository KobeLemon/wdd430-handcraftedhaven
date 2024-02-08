import Link from "next/link";
import Image from "next/image";
import { Artisan } from "@/app/lib/definitions";

export default function ArtisanCard({ id, name, pictures } : Artisan) {

  return (

    <Link className="flex flex-col items-center w-80 justify-between bg-light-grayish-blue p-5 rounded-lg hover:bg-grayish-blue" href={`/artisans/${id}`}>

      <div className='relative aspect-video md:aspect-square'>

        <Image

          className='object-cover rounded-full'

          src={pictures.small}

          alt={`${name} Avatar`}

          width={100}

          height={100}

        />

      </div>

      <div className='py-4'>

        <div className='text-lg'>{name}</div>

      </div>

    </Link>

  )

}