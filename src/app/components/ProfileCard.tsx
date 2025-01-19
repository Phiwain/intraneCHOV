import Image from "next/image";
import {auth} from "@clerk/nextjs/server";
import prisma from "@/libery/client";

const ProfileCard=async () => {

    // @ts-ignore
    const { userId } = auth();

    if (!userId) return null;

    const user = await prisma.user.findFirst({
        where: {
            id: userId,
        },
        include: {
            _count: {
                select: {
                    followers: true,
                },
            },
        },
    });

    if (!user) return null;


    return (
        <div className='p-4 bg-white rounded-lg shadow-md text-sm flex flex-col gap-6'>
            <div className="h-20 relative">
                <Image src={user.cover || "/noACover.png"}
                       alt="" fill className="rounded-md object-cover"/>
                <Image src={user.avatar || "/noAvatar.png"}
                       alt="" width={48} height={48}  className="rounded-full object-cover w-12 h-12 absolute left-0 right-0 m-auto -bottom-6 ring-1 ring-white z-10"/>
            </div>
            <div className='h-20 flex flex-col gap-2 items-center'>
                <span className='font-semibold'>{(user.name && user.surname) ? user.name + " "+ user.surname : user.username}</span>
                <span className='text-xs text-gray-500'>Suivi par {user._count.followers}personnes</span>
                <button className="bg-blue-500 text-white text-xs p-2 rounded-md ">Mon Profil</button>
            </div>
        </div>
    )
}

export default ProfileCard