import cookies from 'next-cookies'

export function unauthPage(ctx) {
    return new Promise(resolve => {
        const allcookies = cookies(ctx)
    
        if(allcookies.token)  
            return ctx.res.writeHead(302, {
                location : '/admin'
            }).end();

            return resolve('unauthorize')
    })    
}


export function authPage(ctx) {
    return new Promise(resolve => {
        const allcookies = cookies(ctx)
    
        if(!allcookies.token)  
            return ctx.res.writeHead(302, {
                location : '/login'
            }).end();

            return resolve({
                token : allcookies.token
            });
    })    
}