import React from "react";
import { InHeader } from "../components/inheader";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import {
  ArrowFatLinesUp,
  ArrowFatLinesDown,
  Share,
  ChatCircleDots,
} from "@phosphor-icons/react";
import EventDetails from "../components/advertise";

const categories = [
  {
    label: "Top Liked",
    value: "topliked",
    entries: [
      {
        id: 1,
        title: "Annual Tech Conference",
        description: "Join us for the biggest tech event of the year!",
        image: "/c.jpg",
        upvotes: 25,
        downvotes: 2,
        comments: 10,
      },
      // Add more event entries here
    ],
  },
  {
    label: "Interactive",
    value: "Interactive",
    entries: [
      {
        id: 2,
        title: "Local Bakery Grand Opening",
        description: "Celebrate the opening of our new artisanal bakery!",
        image: "/day.jpg",
        upvotes: 22,
        downvotes: 1,
        comments: 8,
      },
      // Add more business entries here
    ],
  },
  {
    label: "Thriving",
    value: "Thriving",
    entries: [
      {
        id: 3,
        title: "Inspiring Community Leader",
        description: "Learn about the amazing work of this local hero.",
        image: "/five.jpg",
        upvotes: 21,
        downvotes: 0,
        comments: 15,
      },
      {
        id: 3,
        title: "Inspiring Community Leader",
        description: "Learn about the amazing work of this local hero.",
        image: "/five.jpg",
        upvotes: 21,
        downvotes: 0,
        comments: 15,
      },
    ],
  },
];


const EntryCard = ({ entry }) => (
  <Card className="w-full max-w-[29rem] shadow-lg px-0 py-0">
    <CardHeader floated={false} color="blue-gray">
      <img
        src={entry.image}
        alt={entry.title}
        className="w-full h-48 object-cover"
      />
      <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-tr from-transparent via-transparent to-black/60 " />
    </CardHeader>
    <CardBody>
      <Typography variant="h5" color="blue-gray" className="mb-2">
        {entry.title}
      </Typography>
      <Typography>{entry.description}</Typography>
    </CardBody>
    <CardFooter className="pt-0">
      <div className="flex justify-between items-center">
        <div className="flex space-x-1">
          <Button size="sm" variant="text" className="flex -ml-2 items-center gap-2">
            <ArrowFatLinesUp size={20} />
            <span>{entry.upvotes}</span>
          </Button>
          <Button size="sm" variant="text" className="flex items-center gap-2">
            <ArrowFatLinesDown size={20} />
            <span>{entry.downvotes}</span>
          </Button>
        </div>
        <div className="flex space-x-2">
          <Button size="sm" variant="text" className="flex items-center gap-2">
            <ChatCircleDots size={20} />
            <span>{entry.comments}</span>
          </Button>
          <Button size="sm" variant="text" className="flex items-center">
            <Share size={20} />
          </Button>
        </div>
      </div>
    </CardFooter>
  </Card>
);

const ViewEvent = () => {
  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat relative"
      style={{ backgroundImage: "url('/four.jpg')" }}
    >
      <div className="absolute inset-0 bg-gray-500 bg-opacity-50"></div>
      <InHeader />
      <div className="relative z-10 container mx-auto p-4">
        <div className="mt-2 max-w-3xl text-center mx-auto mb-4">
          <h1 className="block font-bold text-brown-700 text-2xl md:text-3xl lg:text-3xl">
            Explore Top Entries
          </h1>
        </div>
        <Tabs value="topliked" className="mt-2">
          <TabsHeader >
            {categories.map(({ label, value }) => (
              <Tab key={value} value={value}>
                {label}
              </Tab>
            ))}
          </TabsHeader>
          <TabsBody>
            {categories.map(({ value, entries }) => (
              <TabPanel key={value} value={value} className="px-1">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {entries.map((entry) => (
                    <EntryCard key={entry.id} entry={entry} />
                  ))}
                </div>
              </TabPanel>
            ))}
          </TabsBody>
        </Tabs>
      </div>
    </div>
  );
};

export default ViewEvent;
