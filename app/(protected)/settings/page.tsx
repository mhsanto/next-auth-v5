"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { settings } from "@/lib/action/settings";
import { useSession } from "next-auth/react";
import { useTransition } from "react";
import { toast } from "sonner";

const SettingsPage = () => {
	const [pending, startTransition] = useTransition();
	const { update } = useSession();
	const handleUpdateName = () => {
		startTransition(() => {
			settings({ name: "Mahmodul " }).then(() => {
				update();
				toast.success("Name updated");
			});
		});
	};
	return (
		<Card className="w-[600px]">
			<CardHeader>Settings</CardHeader>
			<CardContent>
				<Button disabled={pending} onClick={handleUpdateName}>
					Update Name
				</Button>
			</CardContent>
		</Card>
	);
};

export default SettingsPage;
