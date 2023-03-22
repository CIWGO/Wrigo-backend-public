import { userAccount as User } from "../../models/index";

async function findEmailByUid(uid: string): Promise<string | null> {
	const user = await User.findOne({ uid });
	return user ? user.email : null;
}

export default findEmailByUid;