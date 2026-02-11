import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Check, Zap, Music, Headphones, Loader2 } from 'lucide-react';

export default function SubscribePage() {
  const { isAuthenticated, isSubscribed, updateSubscription } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubscribe = async () => {
    if (!isAuthenticated) {
      navigate('/sign-in');
      return;
    }

    setIsLoading(true);
    // Mock payment flow - simulate DPO Gateway
    await new Promise(resolve => setTimeout(resolve, 2000));
    updateSubscription(true);
    setIsLoading(false);
  };

  const features = [
    'Unlimited music streaming',
    'High quality audio (320kbps)',
    'No advertisements',
    'Offline downloads',
    'Exclusive content',
    'Support your favorite artists',
  ];

  if (isSubscribed) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-neon-blue/10 mb-6 neon-glow-blue">
            <Check className="w-10 h-10 text-neon-blue" />
          </div>
          <h1 className="text-3xl font-bold mb-4 text-neon-blue">You're Subscribed!</h1>
          <p className="text-muted-foreground mb-6">
            Thank you for supporting NeonStream. Enjoy unlimited music streaming!
          </p>
          <Button onClick={() => navigate('/')}>
            Start Listening
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 md:p-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 neon-text-blue">
          Go Premium
        </h1>
        <p className="text-xl text-muted-foreground">
          Unlock the full NeonStream experience
        </p>
      </div>

      {/* Pricing Card */}
      <div className="max-w-md mx-auto">
        <div className="rounded-3xl border-2 border-neon-blue p-8 bg-card shadow-xl" style={{
          boxShadow: '0 0 30px hsl(var(--neon-blue) / 0.3), 0 0 60px hsl(var(--neon-blue) / 0.15)'
        }}>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-full bg-neon-blue/10 flex items-center justify-center">
              <Zap className="w-6 h-6 text-neon-blue" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Premium</h2>
              <p className="text-muted-foreground">Full access</p>
            </div>
          </div>

          <div className="mb-6">
            <div className="flex items-baseline gap-1">
              <span className="text-5xl font-bold text-neon-blue">$9.99</span>
              <span className="text-muted-foreground">/month</span>
            </div>
          </div>

          <ul className="space-y-3 mb-8">
            {features.map((feature, index) => (
              <li key={index} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-neon-blue/10 flex items-center justify-center">
                  <Check className="w-3 h-3 text-neon-blue" />
                </div>
                <span>{feature}</span>
              </li>
            ))}
          </ul>

          <Button
            onClick={handleSubscribe}
            disabled={isLoading}
            className="w-full h-12 text-lg"
            variant="neonBlue"
          >
            {isLoading ? (
              <Loader2 className="w-6 h-6 animate-spin" />
            ) : (
              <>
                <Headphones className="w-5 h-5 mr-2" />
                Subscribe Now
              </>
            )}
          </Button>

          <p className="text-xs text-center text-muted-foreground mt-4">
            Payment processed securely via DPO Gateway
          </p>
        </div>

        {/* Free tier info */}
        <div className="mt-8 p-6 rounded-2xl border border-border bg-card">
          <div className="flex items-center gap-3 mb-4">
            <Music className="w-6 h-6 text-muted-foreground" />
            <h3 className="text-lg font-bold">Free Account</h3>
          </div>
          <p className="text-muted-foreground text-sm mb-4">
            With a free account you can browse the library, create playlists, and like songs. 
            Upgrade to Premium to start streaming music.
          </p>
          {!isAuthenticated && (
            <Button
              variant="outline"
              onClick={() => navigate('/sign-up')}
              className="w-full"
            >
              Create Free Account
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
