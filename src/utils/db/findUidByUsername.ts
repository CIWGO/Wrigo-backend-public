import { userAccount as User } from "../../models/index";

async function findUidByUsername(username: string): Promise<string | null> {
	const user = await User.findOne({ username });
	return user ? user.uid : null;
}

export default findUidByUsername;