import { User, Mail, Camera } from 'lucide-react';
import useAuth from '../../../hooks/useAuth';
import useRole from '../../../hooks/useRole';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const MyProfile = () => {

    const { user, updateProfileFun, setUser, setLoading } = useAuth()
    const { role } = useRole()
    const axiosSecure = useAxiosSecure()

    const handleSubmit = async (e) => {
        setLoading(true)
        e.preventDefault();
        const form = e.target;

        const updatedUser = {
            displayName: form.name.value,
            photoURL: form.photoURL.value,
        }

        try {
            const res = await axiosSecure.patch(`/users/${user?.email}/update`, updatedUser);
            if (res.data.matchedCount > 0) {
                setUser((prev) => ({
                    ...prev,
                    displayName: updatedUser.displayName,
                    photoURL: updatedUser.photoURL,
                }));
                await updateProfileFun(user, updatedUser);
                Swal.fire({
                    title: "Success!",
                    text: "Profile updated successfully",
                    icon: "success",
                    confirmButtonColor: "#4f46e5"
                });
            }
        } catch (error) {
            console.error(error)
            Swal.fire({
                title: "Oops!",
                text: "Something went wrong!",
                icon: "error",
            });
        } finally {
            setLoading(false)
        }
    };
    // console.log({ user, role });

    return (
        <div className="max-w-2xl mx-auto">
            <div className="bg-base-100 p-8 rounded-2xl shadow-sm border border-base-200">
                <h2 className="text-3xl font-bold mb-8 text-center">My Profile</h2>

                <div className="flex flex-col items-center mb-8">
                    <div className="avatar relative group">
                        <div className="w-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 overflow-hidden">
                            <img src={user?.photoURL || "https://via.placeholder.com/150"} alt="Profile" />
                        </div>
                        <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-full cursor-pointer">
                            <Camera className="text-white" />
                        </div>
                    </div>
                    <h3 className="text-xl font-bold mt-4">{user?.displayName}</h3>
                    <div className="badge badge-secondary mt-2 capitalize">{role}</div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-medium">Full Name</span>
                        </label>
                        <label className="input input-bordered flex items-center gap-2">
                            <User size={18} className="text-base-content/60" />
                            <input
                                type="text"
                                name="name"
                                className="grow"
                                defaultValue={user?.displayName}
                                placeholder="Enter your name"
                            />
                        </label>
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-medium">Email Address</span>
                        </label>
                        <label className="input input-bordered flex items-center gap-2 bg-base-200 cursor-not-allowed">
                            <Mail size={18} className="text-base-content/60" />
                            <input
                                type="text"
                                className="grow text-base-content/60"
                                value={user?.email}
                                readOnly
                                disabled
                            />
                        </label>
                        <span className="label-text-alt text-base-content/60 mt-1 ml-1">Email cannot be changed</span>
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-medium">Photo URL</span>
                        </label>
                        <label className="input input-bordered flex items-center gap-2">
                            <span className="text-xs font-mono text-base-content/60">URL</span>
                            <input
                                type="url"
                                name="photoURL"
                                className="grow"
                                defaultValue={user?.photoURL}
                                placeholder="https://..."
                            />
                        </label>
                    </div>

                    <div className="form-control mt-6">
                        <button className="btn btn-primary w-full">Update Profile</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default MyProfile;
