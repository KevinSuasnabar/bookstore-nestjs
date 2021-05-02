import { genSalt, hash } from "bcryptjs";
import { EntityRepository, getConnection, Repository } from "typeorm";
import { Role } from "../role/role.entity";
import { RoleRepository } from "../role/role.repository";
import { RoleType } from "../role/roletype.enum";
import { UserDetail } from "../user/user.details.entity";
import { User } from "../user/user.entity";
import { SignupDto } from "./dto";

@EntityRepository(User)
export class AuthRepository extends Repository<User>{

    async sigup(signupDto: SignupDto) {
        const { username, email, password } = signupDto;
        const user = new User();
        user.username = username;
        user.email = email;
        user.roles = []
        const roleRepository: RoleRepository = await getConnection().getRepository(Role);

        const defaultRole: Role = await roleRepository.findOne({ where: { name: RoleType.GENERAL } });

        user.roles.push(defaultRole);

        /**Typeorm creara una fila en la tabla user_detail apesar que no tenga datos, solo con el id */
        const userDetails = new UserDetail();
        user.details = userDetails;

        /**Numero aleatorio que se le agrega un hash al inicio o final para que sea dificl decodificarlo */
        const salt = await genSalt(10);
        user.password = await hash(password, salt);

        await user.save();

    }
}