import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { 
  User, 
  CreditCard, 
  LogOut, 
  Moon,
  Bell,
  Shield,
  HelpCircle,
  ChevronRight 
} from 'lucide-react';

export default function SettingsPage() {
  const { user, isAuthenticated, signOut, isSubscribed } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <div className="min-h-screen p-4 md:p-8 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 neon-text-blue">Settings</h1>

      {/* Account Section */}
      <section className="mb-8">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <User className="w-5 h-5" />
          Account
        </h2>
        
        {isAuthenticated ? (
          <div className="space-y-4">
            <div className="p-4 border border-border rounded-xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{user?.displayName}</p>
                  <p className="text-sm text-muted-foreground">{user?.email}</p>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                >
                  Edit Profile
                </Button>
              </div>
            </div>

            <button
              onClick={handleSignOut}
              className="w-full flex items-center justify-between p-4 border border-border rounded-xl hover:border-destructive hover:text-destructive transition-colors"
            >
              <span className="flex items-center gap-3">
                <LogOut className="w-5 h-5" />
                Sign Out
              </span>
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        ) : (
          <div className="p-4 border border-border rounded-xl">
            <p className="text-muted-foreground mb-4">
              Sign in to access your library and settings
            </p>
            <Button onClick={() => navigate('/sign-in')}>
              Sign In
            </Button>
          </div>
        )}
      </section>

      {/* Subscription Section */}
      <section className="mb-8">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <CreditCard className="w-5 h-5" />
          Subscription
        </h2>
        
        <div className="p-4 border border-border rounded-xl">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="font-medium">
                {isSubscribed ? 'Premium' : 'Free Account'}
              </p>
              <p className="text-sm text-muted-foreground">
                {isSubscribed 
                  ? 'Unlimited music streaming' 
                  : 'Subscribe to play music'
                }
              </p>
            </div>
            {isSubscribed ? (
              <span className="px-3 py-1 bg-neon-blue/20 text-neon-blue text-sm rounded-full border border-neon-blue">
                Active
              </span>
            ) : null}
          </div>
          
          {!isSubscribed && (
            <Button
              onClick={() => navigate('/subscribe')}
              className="w-full"
            >
              Upgrade to Premium
            </Button>
          )}
        </div>
      </section>

      {/* Preferences Section */}
      <section className="mb-8">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Moon className="w-5 h-5" />
          Preferences
        </h2>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border border-border rounded-xl">
            <div className="flex items-center gap-3">
              <Bell className="w-5 h-5" />
              <Label htmlFor="notifications">Push Notifications</Label>
            </div>
            <Switch id="notifications" />
          </div>

          <div className="flex items-center justify-between p-4 border border-border rounded-xl">
            <div className="flex items-center gap-3">
              <Shield className="w-5 h-5" />
              <Label htmlFor="explicit">Allow Explicit Content</Label>
            </div>
            <Switch id="explicit" defaultChecked />
          </div>
        </div>
      </section>

      {/* Help Section */}
      <section className="mb-8">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <HelpCircle className="w-5 h-5" />
          Help & Support
        </h2>
        
        <div className="space-y-2">
          <button className="w-full flex items-center justify-between p-4 border border-border rounded-xl hover:border-neon-blue transition-colors">
            <span>Help Center</span>
            <ChevronRight className="w-5 h-5" />
          </button>
          <button className="w-full flex items-center justify-between p-4 border border-border rounded-xl hover:border-neon-blue transition-colors">
            <span>Contact Support</span>
            <ChevronRight className="w-5 h-5" />
          </button>
          <button className="w-full flex items-center justify-between p-4 border border-border rounded-xl hover:border-neon-blue transition-colors">
            <span>Privacy Policy</span>
            <ChevronRight className="w-5 h-5" />
          </button>
          <button className="w-full flex items-center justify-between p-4 border border-border rounded-xl hover:border-neon-blue transition-colors">
            <span>Terms of Service</span>
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* App Info */}
      <div className="text-center text-sm text-muted-foreground">
        <p>NeonStream v1.0.0</p>
        <p className="mt-1">© 2024 NeonStream. All rights reserved.</p>
      </div>
    </div>
  );
}
