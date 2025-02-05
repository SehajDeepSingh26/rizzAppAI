import { redirect } from "next/navigation";
import { ClientPage } from "./client_page";
import {
  Configuration,
  PersonaApiFactory,
  ScenarioApiFactory,
} from "@/generated";
import { UserController } from "@/lib/server/controller/user";

export default async function Page({
  searchParams,
}: {
  searchParams: { persona: string | null; scenario: string | null };
}) {
  const { persona, scenario } = searchParams;
//   const user = await UserController.getUserFromCookies();
    const user = {
        email: 'sehajdeep2611@gmail.com',
        stripe_customer: 'cus_RiVPFdd05mt7Z1'
      }
  console.log("--------------------------------------")
  console.log(user)

  if (!persona || !scenario) {
    console.error("Missing persona or scenario");
    return redirect("/");
  }

  const config = new Configuration({
    apiKey: process.env.GABBER_API_KEY,
  });

  const personaApi = PersonaApiFactory(config);
  const scenarioApi = ScenarioApiFactory(config);

  const personaObj = (await personaApi.getPersona(persona)).data;
  const scenarioObj = (await scenarioApi.getScenario(scenario)).data;

  return (
    <div className="w-full h-full bg-base-200 rounded-lg">
      <ClientPage persona={personaObj} scenario={scenarioObj} />
    </div>
  );
}
