"use client"

import {
    Card,
    CardContent,
    CardHeader,
    CardFooter,
  } from "@/components/ui/card";
import AuthHeader from "./auth-header";
import BackButton from "./back-button";




const CardWrapper = ({label, title, backButtonHref, backButtonLabel, children}) => {
  return (
    <Card className="xl:w-1/4 md:w-1/2 shadow-md">
        <CardHeader>
            <AuthHeader label={label} title={title} />
        </CardHeader>
        <CardContent>
            {children}
        </CardContent>
        <CardFooter>
            <BackButton label={backButtonLabel} href={backButtonHref} />
            </CardFooter>
    </Card>
  )
}

export default CardWrapper