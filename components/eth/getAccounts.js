export default ({eth}) =>
  new Promise((resolve, reject) =>
    eth.getAccounts((error, accounts) =>
      error ?
        reject(error)
        : resolve(accounts)
    )
  )