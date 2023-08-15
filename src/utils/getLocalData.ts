export const getLocalData = () => {
    let privKey = null;
    let userList = [];

    if (typeof window !== 'undefined') {
        const storedKeys = localStorage.getItem('keys');
        if (storedKeys) {
            privKey = JSON.parse(storedKeys).privateKey;
        }

        const storedUserList = localStorage.getItem('follow-list');
        if (storedUserList) {
            userList = JSON.parse(storedUserList);
        }
    }

    return { privKey, userList };
};
