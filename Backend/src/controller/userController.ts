import prisma from "../config/auth/db";
import { Request, Response } from 'express';

export async function findUser(req: Request, res: Response) {
    try {
        const { email } = req.body;
        console.log('Request Body h:', req.body);
        console.log('Email h:', email);
        const isUser = await prisma.user.findUnique({
            where: { email: email }
        })
        if (!isUser) {
            return res.status(404).send(`This email ${email}, is not exist. Please use correct one`);
        }
        res.status(200).send({ message: "User Found Successfully", isUser });
    } catch (e) {
        res.status(500).send(e);
        console.log(e);
    }
}
export async function createUser(req: Request, res: Response) {
    try {
        const { name, email, password } = req.body;
        const isEmail = await prisma.user.findUnique({
            where: { email }
        })
        if (isEmail) {
            return res.status(404).send(`This email ${email}, already exist. Please use unique one`);
        }

        const userCreated = await prisma.user.create({
            data: { name, email, password }
        })
        res.status(200).send({ message: "User created Successfully", userCreated });
    } catch (e) {
        res.status(500).send(e);
        console.log(e);
    }
}

export async function updateUser(req: Request, res: Response) {
    try {
        const id = Number(req.params.id);
        const { name, email, password } = req.body;

        const isUser = await prisma.user.findUnique({
            where: { id }
        })

        if (!isUser || isUser.isDelete === true) {
            return res.status(404).send(`User with ID ${id} not found`);
        }

        const userUpdated = await prisma.user.update({
            where: { id },
            data: { name, email, password }
        })
        res.status(200).send({ message: "User created Successfully", userUpdated });
    } catch (e) {
        res.status(500).send(e);
        console.log(e);
    }

}

//Soft Delete User
export const deleteUser = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        const isUser = await prisma.user.findUnique({
            where: { id }
        })
        if (!isUser || isUser.isDelete === true) {
            return res.status(404).send(`User with ID ${id} not found`);
        }

        const deleteUser = await prisma.user.update({
            where: { id },
            data: { isDelete: true }
        })

        res.status(200).send({ message: "User Deleted Successfully!", deleteUser });

    } catch (e) {
        console.error(e);
        res.status(500).send(e);
    }
}

