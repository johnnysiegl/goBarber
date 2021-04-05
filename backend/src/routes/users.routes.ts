import { Router } from 'express'
import multer from 'multer'
import uploadConfig from '../config/upload'

import CreateUserService from '../services/CreateUserService'
import UpdateUserAvatarService from '../services/UpdateUserAvatarService'

import ensureauthenticated from '../middlewares/ensureauthenticated'

const usersRouter = Router()
const upload = multer(uploadConfig)

usersRouter.post('/', async (request, response) => {

    const { name, email, password } = request.body;
    const createUser = new CreateUserService()
    const user = await createUser.execute({
        name, email, password
    })

    //@ts-expect-error
    delete user.password

    return response.json(user)
})


//é colocar apenas nessa rota porque eu preciso estar cadastrado alterar o avatar, 
//enquanto na rota de criação eu não tenho porque eu não preciso estar logado para criar um usuário
usersRouter.patch('/avatar', ensureauthenticated, upload.single('avatar'), 
    async (request, response) => {
        const updateUserAvatarService = new UpdateUserAvatarService()

        const user = await updateUserAvatarService.execute({
            user_id: request.user.id,
            avatarFileName: request.file.filename
        })

        // @ts-expect-error
        delete user.password

        return response.json(user)
    })

export default usersRouter