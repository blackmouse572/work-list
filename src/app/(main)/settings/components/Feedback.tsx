import { Icon } from "@/app/components/Icons";
import { Button } from "@nextui-org/button";
import { Textarea } from "@nextui-org/input";
import React from "react";

function Feedback() {
  return (
    <>
      <Textarea placeholder="Your feedback" maxLength={3000} />
      <Button
        endContent={<Icon name="tabler/chevron-right-outline" />}
        size="sm"
      >
        Send
      </Button>
    </>
  );
}

export default Feedback;
