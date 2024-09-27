require('dotenv').config();
import User from '../../models/User.model';
const typeDatabase = process.env.DATABASE || 'NOSQL';

var loginRepository;
var createUserRepository;
var getAllUsers;
var updateUserRepository;
var deleteUserRepository;
var getSingleUserRepository;

switch (typeDatabase) {
    case 'SQL':
    case 'sql':
        /* Logica para SQL */

        break;

    case 'NOSQL':
    case 'nosql':

        loginRepository = async (email: string): Promise<any> => {
            return await User.findOne({ email: email });
        }

        createUserRepository = async (name: string, password: string, email: string, phoneNumber: string, role: string, address: [], cards: [], created_at: Date): Promise<any> => {
            try {

                const user = new User({
                    name,
                    password,
                    email,
                    phoneNumber,
                    role,
                    address,
                    cards,
                    created_at,
                })
                let newUser = await user.save().then(() => {
                    return user;
                }).catch((error) => {

                    return { ok: false, message: error };
                })
                return newUser;

            } catch (error) {
                console.error('userRepository CreatUser', error);
                return false;
            }
        }

        getAllUsers = async (): Promise<any> => {
            return await User.find();
        }

        updateUserRepository = async (key: object, newValue: any): Promise<any> => {
            try {

                let user = await User.findOneAndUpdate(key, newValue).then(() => {
                    return User
                }).catch((error) => {
                    return {
                        ok: false,
                        message: error
                    }
                });
                return user;

            } catch (error) {
                return false
            }
        }

        deleteUserRepository = async (id: string) => {
            let user = await User.deleteOne({ '_id': id }).then(() => {
                return User;
            }).catch((error) => {
                return {
                    ok: false,
                    message: error
                }
            });
            return user;
        }

        getSingleUserRepository = async (data: object): Promise<any> => {
            let user = await User.find(data)
                .then((user) => {
                    return user[0];
                })
                .catch((error) => {
                    return {
                        ok: false,
                        message: error,
                    };
                });
            return user;
        };

        break;

    default:
        break;
}
module.exports = {
    loginRepository,
    createUserRepository,
    getAllUsers,
    updateUserRepository,
    deleteUserRepository,
    getSingleUserRepository,
}