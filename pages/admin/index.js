import {authPage} from '../../middlewares/authorizationPage'

export async function getServerSideProps(ctx) {
   
        const auth = await authPage(ctx);

        return {props : {}}

}

export default function Admin() {

    return (
      <div className="flex justify-end"> <p>  admin </p> </div>
    )
}