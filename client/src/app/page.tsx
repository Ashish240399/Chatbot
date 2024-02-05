import { Button } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex justify-center items-center h-[100vh] w-[100vw] gap-5 bg-gradient-to-br from-[#12121d] via-[#2a2a44] to-[#12121d]">
      <Link href="/chatpage">
        <Button variant="contained" color="secondary">
          Chat Page
        </Button>
      </Link>
      <Link href="/feedbackpage">
        <Button variant="contained" color="warning">
          Feedback Table
        </Button>
      </Link>
    </div>
  );
}
