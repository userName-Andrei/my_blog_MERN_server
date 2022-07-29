const removePass = (user) => {
    const {passwordHash, ...userDoc} = user;

    return userDoc;
}

export default removePass