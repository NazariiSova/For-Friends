// pages/index.tsx

import { useEffect, useState } from "react";
import { GetServerSideProps, NextPage } from "next";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/config";
import Card from "../components/Card"; // компонент для відображення картки
import Link from "next/link";

interface Post {
  id: string;
  title: string;
  short_description: string;
  main_photo: {
    url: string;
    alt_tag: string;
  };
  post_type: number;
}

interface HomeProps {
  initialGears: Post[];
  initialTrips: Post[];
}

const Home: NextPage<HomeProps> = ({ initialGears, initialTrips }) => {
  const [gears, setGears] = useState<Post[]>(initialGears);
  const [trips, setTrips] = useState<Post[]>(initialTrips);

  return (
    <div>
      <section>
        <h2>Gears</h2>
        <div className="grid grid-cols-2 gap-4">
          {gears.map((gear) => (
            <Card key={gear.id} post={gear} />
          ))}
        </div>
        <Link href="/gears">Read more</Link>
      </section>

      <section>
        <h2>Trips</h2>
        <div className="grid grid-cols-2 gap-4">
          {trips.map((trip) => (
            <Card key={trip.id} post={trip} />
          ))}
        </div>
        <Link href="/trips">Read more</Link>
      </section>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const gearsSnapshot = await getDocs(collection(db, "post"));
  const gears = gearsSnapshot.docs
    .map((doc) => ({ id: doc.id, ...doc.data() }))
    .filter((post: Post) => post.post_type === 0)
    .slice(0, 8) as Post[];

  const tripsSnapshot = await getDocs(collection(db, "post"));
  const trips = tripsSnapshot.docs
    .map((doc) => ({ id: doc.id, ...doc.data() }))
    .filter((post: Post) => post.post_type === 1)
    .slice(0, 8) as Post[];

  return {
    props: {
      initialGears: gears,
      initialTrips: trips,
    },
  };
};

export default Home;
