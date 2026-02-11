import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Heart, Gift, Loader2, Check } from 'lucide-react';

export default function DonatePage() {
  const [amount, setAmount] = useState('10');
  const [isLoading, setIsLoading] = useState(false);
  const [isDone, setIsDone] = useState(false);

  const presetAmounts = ['5', '10', '25', '50', '100'];

  const handleDonate = async () => {
    setIsLoading(true);
    // Mock DPO Gateway payment
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsLoading(false);
    setIsDone(true);
  };

  if (isDone) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-neon-blue/10 mb-6 neon-glow-blue">
            <Check className="w-10 h-10 text-neon-blue" />
          </div>
          <h1 className="text-3xl font-bold mb-4 text-neon-blue">Thank You!</h1>
          <p className="text-muted-foreground mb-6">
            Your donation of ${amount} helps us continue building the best music streaming experience.
          </p>
          <Heart className="w-8 h-8 text-neon-blue mx-auto pulse-neon" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 md:p-8">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-neon-blue/10 mb-4 neon-glow-blue">
          <Gift className="w-8 h-8 text-neon-blue" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4 neon-text-blue">
          Support NeonStream
        </h1>
        <p className="text-xl text-muted-foreground max-w-xl mx-auto">
          Help us keep the music playing. Your donation goes directly towards platform development and artist support.
        </p>
      </div>

      {/* Donation Form */}
      <div className="max-w-md mx-auto">
        <div className="rounded-3xl border-2 border-neon-blue p-8 bg-card shadow-xl" style={{
          boxShadow: '0 0 30px hsl(var(--neon-blue) / 0.3), 0 0 60px hsl(var(--neon-blue) / 0.15)'
        }}>
          <Label className="text-lg mb-4 block font-bold">Select Amount</Label>
          
          {/* Preset Amounts */}
          <div className="grid grid-cols-5 gap-2 mb-6">
            {presetAmounts.map((preset) => (
              <Button
                key={preset}
                variant={amount === preset ? 'default' : 'outline'}
                onClick={() => setAmount(preset)}
                className="text-sm"
              >
                ${preset}
              </Button>
            ))}
          </div>

          {/* Custom Amount */}
          <div className="mb-6">
            <Label htmlFor="customAmount">Custom Amount</Label>
            <div className="relative mt-2">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-bold">$</span>
              <Input
                id="customAmount"
                type="number"
                min="1"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="pl-8 rounded-xl"
              />
            </div>
          </div>

          {/* Summary */}
          <div className="p-4 bg-muted rounded-xl mb-6">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Donation Amount</span>
              <span className="text-2xl font-bold text-neon-blue">${amount}</span>
            </div>
          </div>

          {/* Donate Button */}
          <Button
            onClick={handleDonate}
            disabled={isLoading || !amount || parseFloat(amount) <= 0}
            className="w-full h-12 text-lg"
            variant="neonBlue"
          >
            {isLoading ? (
              <Loader2 className="w-6 h-6 animate-spin" />
            ) : (
              <>
                <Heart className="w-5 h-5 mr-2" />
                Donate ${amount}
              </>
            )}
          </Button>

          <p className="text-xs text-center text-muted-foreground mt-4">
            Payment processed securely via DPO Gateway
          </p>
        </div>

        {/* Benefits */}
        <div className="mt-8 p-6 rounded-2xl border border-border bg-card">
          <h3 className="text-lg font-bold mb-4">Where Your Donation Goes</h3>
          <ul className="space-y-3 text-muted-foreground">
            <li className="flex items-start gap-3">
              <span className="w-2 h-2 bg-neon-blue rounded-full mt-2 flex-shrink-0" />
              Platform development and new features
            </li>
            <li className="flex items-start gap-3">
              <span className="w-2 h-2 bg-neon-blue rounded-full mt-2 flex-shrink-0" />
              Supporting independent artists
            </li>
            <li className="flex items-start gap-3">
              <span className="w-2 h-2 bg-neon-blue rounded-full mt-2 flex-shrink-0" />
              Server costs and infrastructure
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
