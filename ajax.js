class Ajax {
  constructor (_req_) {
    this.req = _req_
    this.sendURL()
  }

  sendURL() {
    let xhr = new XMLHttpRequest()
    let fd = new FormData()

    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          this._success(xhr.responseText)
        } else {
          this._error(xhr)
        }
      }
    }

    for (let key in this.req) {
      fd.append(key, this.req[key])
    }
    xhr.open(this.req.type, this.req.url, true)
    xhr.send(fd)

    return this
  }

  success(fn) {
    this._success = fn
    return this
  }
  _success() {}

  error(fn) {
    this._error = fn
    return this
  }
  _error() {}
}

window.__ajax__ =  (_req_) => {
  return new Ajax(_req_)
}

