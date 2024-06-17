import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from '@material-tailwind/react';

export function CardDefault() {
  return (
    <Card className="mt-6 w-96">
      <CardHeader color="blue-gray" className="relative h-56">
        <img
          src="https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
          alt="card-image"
        />
      </CardHeader>
      <CardBody>
        <Typography variant="h5" color="blue-gray" className="mb-2">
          Yoga Poses
        </Typography>
        <Typography>
          This pose is called the cat pose. It is a great pose to stretch your
          back and shoulders. To do this pose, start on your hands and knees.
          Make sure your hands are directly under your shoulders and your knees
          are directly under your hips. Inhale as you arch your back and look
          up. Exhale as you round your back and tuck your chin to your chest.
          Repeat this movement for 5-10 breaths.
        </Typography>
      </CardBody>
      <CardFooter className="pt-0">
        <Button>Read More</Button>
      </CardFooter>
    </Card>
  );
}
