"use client";
import RoleGate from "@/components/auth/role-gate";
import { FormSuccess } from "@/components/form-success";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Admin } from "@/lib/action/admin.action";
import { UserRole } from "@prisma/client";
import { toast } from "sonner";
const AdminPage = () => {
	const handleAdmin = () => {
		fetch("/api/admin").then((response) => {
			if (response.ok) {
				toast.success("Admin Api Route Works");
			}
			toast.error("Admin Api Route Failed");
		});
	};
	async function onAdminAction() {
		await Admin().then((response) => {
			if (response.success) {
				toast.success("Admin Action Works");
			} else {
				toast.error("Admin Action Failed");
			}
		});
	}
	return (
		<Card className="w-[600px]">
			<CardHeader>
				<p className="text-2xl font-semibold text-center">Admin</p>
			</CardHeader>
			<CardContent className="space-y-4">
				<RoleGate allowedRole={UserRole.ADMIN}>
					<FormSuccess message="I guess you are an Admin" />
				</RoleGate>
				<div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-md">
					<p className="text-sm font-medium">Admin Api Route</p>
					<Button onClick={handleAdmin}>Click TO Test</Button>
				</div>
				<div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-md">
					<p className="text-sm font-medium ">Admin-only Server ACtion</p>
					<Button onClick={onAdminAction}>Click TO Test</Button>
				</div>
			</CardContent>
		</Card>
	);
};

export default AdminPage;
