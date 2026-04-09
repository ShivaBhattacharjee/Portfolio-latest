import React, { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import ContactForm from "./contact-form";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { GeistPixelSquare } from "geist/font/pixel";
import ButtonCursorIcon from "@/components/icons/button-cursor";
import { CornerBrackets } from "@/components/ui/corner-brackets";

const ContactDialog = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleOnSubmit = async (values) => {
    try {
      setIsSubmitting(true);

      // Send the form data to your API endpoint that connects to Discord
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      toast.success("Message has been sent successfully", {
        description: "Your message has been sent to Discord",
      });

      console.log(values);
      setIsOpen(false);
    } catch (error) {
      toast.error("Error sending message", {
        description: error.message,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <CornerBrackets>
            <Button size="sm">
              <ButtonCursorIcon className="mr-1.5 h-3 w-3" /> Contact Me
            </Button>
          </CornerBrackets>
        </DialogTrigger>
        <DialogContent className={`${GeistPixelSquare.className} text-sm border-white/[0.08]`}>
          <DialogHeader>
            <DialogTitle className="font-doto">Contact Me</DialogTitle>
            <DialogDescription className="font-doto">
              Let&apos;s get in touch by sending me a message.
            </DialogDescription>
          </DialogHeader>
          <ContactForm
            handleOnSubmit={handleOnSubmit}
            isSubmitting={isSubmitting}
          />
        </DialogContent>
      </Dialog>

  );
};

export default ContactDialog;
