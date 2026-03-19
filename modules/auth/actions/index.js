"use server";
import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/lib/db";


export async function onBoardUser(){
    try {
        const user = await currentUser();
        if(!user){
            return {success: false, message: "no authenticated user found"}
        }
        const {id , firstName , lastName , emailAddresses, imageUrl} = user;
        const primaryEmail = emailAddresses[0]?.emailAddress || "";

        const newuser = await db.user.upsert({
            where:{
                clerkId:id
            },
            update:{
                firstName:firstName || null,
                lastName:lastName || null,
                email: primaryEmail,
                imageUrl:imageUrl || null
            },
            create:{
                clerkId: id,
                firstName: firstName || null,
                lastName: lastName || null,
                imageUrl: imageUrl || null,
                email: primaryEmail,
                
            }
        })
        return {sucess:true, user:newuser,message:"User onboarded"}


        
    } catch (error) {
        console.error("Error occurred while onboarding user:", error);
        return {success: false, message: "Failed to onboard user"}
    }
}
